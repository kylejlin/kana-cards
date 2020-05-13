import { option, Option } from "rusty-ts";
import romajiArray from "./romajiArray";
import { Romaji, Deck } from "./types";
import HIRAGANA_TABLE_URL from "./images/hiragana_stroke_order.png";
import KATAKANA_TABLE_URL from "./images/katakana_stroke_order.png";

export interface KanaMaps {
  [Deck.Hiragana]: Option<KanaMap>;
  [Deck.Katakana]: Option<KanaMap>;
}

export type KanaMap = Map<Romaji, HTMLImageElement>;

interface ResolvablePromise<T> {
  readonly raw: Promise<T>;
  fulfill(value: T): void;
  reject(value: unknown): void;
}

interface TableConfig {
  leftCellX: number;
  topCellY: number;
  cellWidth: number;
  cellHeight: number;
  crop: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  columns: number;
  rows: number;
  cellPositions: Map<Romaji, CellPosition>;
}

interface CellPosition {
  column: number;
  row: number;
}

const HIRAGANA_TABLE_CONFIG: TableConfig = {
  leftCellX: 58,
  topCellY: 162,
  cellWidth: 213.3,
  cellHeight: 266.5,
  crop: {
    left: 0,
    top: 0,
    width: 206,
    height: 187,
  },
  columns: 11,
  rows: 5,
  cellPositions: new Map<Romaji, CellPosition>([
    ["n", { row: 0, column: 0 }],

    ["wa", { row: 0, column: 1 }],
    ["wi", { row: 1, column: 1 }],
    ["we", { row: 3, column: 1 }],
    ["wo", { row: 4, column: 1 }],

    ["ra", { row: 0, column: 2 }],
    ["ri", { row: 1, column: 2 }],
    ["ru", { row: 2, column: 2 }],
    ["re", { row: 3, column: 2 }],
    ["ro", { row: 4, column: 2 }],

    ["ya", { row: 0, column: 3 }],
    ["yu", { row: 2, column: 3 }],
    ["yo", { row: 4, column: 3 }],

    ["ma", { row: 0, column: 4 }],
    ["mi", { row: 1, column: 4 }],
    ["mu", { row: 2, column: 4 }],
    ["me", { row: 3, column: 4 }],
    ["mo", { row: 4, column: 4 }],

    ["ha", { row: 0, column: 5 }],
    ["hi", { row: 1, column: 5 }],
    ["fu", { row: 2, column: 5 }],
    ["he", { row: 3, column: 5 }],
    ["ho", { row: 4, column: 5 }],

    ["na", { row: 0, column: 6 }],
    ["ni", { row: 1, column: 6 }],
    ["nu", { row: 2, column: 6 }],
    ["ne", { row: 3, column: 6 }],
    ["no", { row: 4, column: 6 }],

    ["ta", { row: 0, column: 7 }],
    ["chi", { row: 1, column: 7 }],
    ["tsu", { row: 2, column: 7 }],
    ["te", { row: 3, column: 7 }],
    ["to", { row: 4, column: 7 }],

    ["sa", { row: 0, column: 8 }],
    ["shi", { row: 1, column: 8 }],
    ["su", { row: 2, column: 8 }],
    ["se", { row: 3, column: 8 }],
    ["so", { row: 4, column: 8 }],

    ["ka", { row: 0, column: 9 }],
    ["ki", { row: 1, column: 9 }],
    ["ku", { row: 2, column: 9 }],
    ["ke", { row: 3, column: 9 }],
    ["ko", { row: 4, column: 9 }],

    ["a", { row: 0, column: 10 }],
    ["i", { row: 1, column: 10 }],
    ["u", { row: 2, column: 10 }],
    ["e", { row: 3, column: 10 }],
    ["o", { row: 4, column: 10 }],
  ]),
};

const KATAKANA_TABLE_CONFIG: TableConfig = {
  leftCellX: 58,
  topCellY: 162,
  cellWidth: 213.3,
  cellHeight: 266.5,
  crop: {
    left: 0,
    top: 0,
    width: 206,
    height: 187,
  },
  columns: 11,
  rows: 5,
  cellPositions: new Map([
    ["n", { row: 0, column: 0 }],

    ["wa", { row: 0, column: 1 }],
    ["wi", { row: 1, column: 1 }],
    ["we", { row: 3, column: 1 }],
    ["wo", { row: 4, column: 1 }],

    ["ra", { row: 0, column: 2 }],
    ["ri", { row: 1, column: 2 }],
    ["ru", { row: 2, column: 2 }],
    ["re", { row: 3, column: 2 }],
    ["ro", { row: 4, column: 2 }],

    ["ya", { row: 0, column: 3 }],
    ["yu", { row: 2, column: 3 }],
    ["yo", { row: 4, column: 3 }],

    ["ma", { row: 0, column: 4 }],
    ["mi", { row: 1, column: 4 }],
    ["mu", { row: 2, column: 4 }],
    ["me", { row: 3, column: 4 }],
    ["mo", { row: 4, column: 4 }],

    ["ha", { row: 0, column: 5 }],
    ["hi", { row: 1, column: 5 }],
    ["fu", { row: 2, column: 5 }],
    ["he", { row: 3, column: 5 }],
    ["ho", { row: 4, column: 5 }],

    ["na", { row: 0, column: 6 }],
    ["ni", { row: 1, column: 6 }],
    ["nu", { row: 2, column: 6 }],
    ["ne", { row: 3, column: 6 }],
    ["no", { row: 4, column: 6 }],

    ["ta", { row: 0, column: 7 }],
    ["chi", { row: 1, column: 7 }],
    ["tsu", { row: 2, column: 7 }],
    ["te", { row: 3, column: 7 }],
    ["to", { row: 4, column: 7 }],

    ["sa", { row: 0, column: 8 }],
    ["shi", { row: 1, column: 8 }],
    ["su", { row: 2, column: 8 }],
    ["se", { row: 3, column: 8 }],
    ["so", { row: 4, column: 8 }],

    ["ka", { row: 0, column: 9 }],
    ["ki", { row: 1, column: 9 }],
    ["ku", { row: 2, column: 9 }],
    ["ke", { row: 3, column: 9 }],
    ["ko", { row: 4, column: 9 }],

    ["a", { row: 0, column: 10 }],
    ["i", { row: 1, column: 10 }],
    ["u", { row: 2, column: 10 }],
    ["e", { row: 3, column: 10 }],
    ["o", { row: 4, column: 10 }],
  ]),
};

export const kanaMaps: KanaMaps = {
  [Deck.Hiragana]: option.none(),
  [Deck.Katakana]: option.none(),
};

const hiraganaMapLoaded = loadTable(HIRAGANA_TABLE_URL, HIRAGANA_TABLE_CONFIG);
const katakanaMapLoaded = loadTable(KATAKANA_TABLE_URL, KATAKANA_TABLE_CONFIG);

hiraganaMapLoaded.raw.then(imageMap => {
  kanaMaps[Deck.Hiragana] = option.some(imageMap);
});
katakanaMapLoaded.raw.then(imageMap => {
  kanaMaps[Deck.Katakana] = option.some(imageMap);
});

export const kanaMapsLoaded = Promise.all([
  hiraganaMapLoaded.raw,
  katakanaMapLoaded.raw,
]);

function loadTable(
  url: string,
  config: TableConfig,
): ResolvablePromise<KanaMap> {
  const rProm = createResolvablePromise<KanaMap>();
  const tableImage = document.createElement("img");
  tableImage.src = url;

  tableImage.addEventListener("load", () => {
    const tableCanvas = document.createElement("canvas");
    tableCanvas.width = tableImage.width;
    tableCanvas.height = tableImage.height;
    const tableCtx = tableCanvas.getContext("2d")!;
    tableCtx.drawImage(tableImage, 0, 0);

    const kanaMap = new Map<Romaji, HTMLImageElement>();

    const cellCanvas = document.createElement("canvas");
    cellCanvas.width = config.crop.width;
    cellCanvas.height = config.crop.height;
    const cellCtx = cellCanvas.getContext("2d")!;

    romajiArray.forEach(romaji => {
      const { column, row } = config.cellPositions.get(romaji)!;
      const cellLeft = Math.round(config.leftCellX + column * config.cellWidth);
      const cellTop = Math.round(config.topCellY + row * config.cellHeight);
      const croppedImageData = tableCtx.getImageData(
        cellLeft + config.crop.left,
        cellTop + config.crop.top,
        config.crop.width,
        config.crop.height,
      );
      cellCtx.putImageData(croppedImageData, 0, 0);
      const cellImage = document.createElement("img");
      cellImage.src = cellCanvas.toDataURL("image/png", 1.0);
      kanaMap.set(romaji, cellImage);
    });

    rProm.fulfill(kanaMap);
  });

  tableImage.addEventListener("error", rProm.reject);

  return rProm;
}

function createResolvablePromise<T>(): ResolvablePromise<T> {
  let fulfill!: (value: T) => void;
  let reject!: (value: unknown) => void;
  const raw: Promise<T> = new Promise((f, r) => {
    fulfill = f;
    reject = r;
  });
  return { raw, fulfill, reject };
}
