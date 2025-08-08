import { EngineName } from "@/types/enums";
import { UciEngine } from "./uciEngine";
import { isWasmSupported } from "./shared";

export class Stockfish17 {
  public static async create(lite?: boolean): Promise<UciEngine> {
    if (!Stockfish17.isSupported()) {
      throw new Error("Stockfish 17 is not supported");
    }

    const enginePath = `https://cdn.statically.io/gh/GuillaumeSD/Chesskit/main/public/engines/stockfish-17/stockfish-17${
      lite ? "-lite" : ""
    }-single.js`;

    const engineName = lite
      ? EngineName.Stockfish17Lite
      : EngineName.Stockfish17;

    const res = await fetch(enginePath);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    return UciEngine.create(engineName, url);
  }

  public static isSupported() {
    return isWasmSupported();
  }
}
