function opening() {
  console.log("オープニング、オープニング...オープニング");
}
function ending() {
  console.log("お わ り");
}

function originalStream() {
  opening();
  console.log("せっせっせいや");
  ending();
}

class Comedian {
  constructor(private name: string, private shouldWatch: boolean, public isFirst: boolean = false) {}

  private _getOriginalStreamDescription(): string {
    return "川原さんのYoutube";
  }

  private _getSelfDescription(): string {
    return `僕が${this.shouldWatch ? "見てる" : "見てない"}`;
  }

  private _getOtherDescription(comedian: Comedian): string {
    return `${comedian.name}さんが${comedian.shouldWatch ? "見てる" : "見てない"}`;
  }

  private _getDescription(comedians: Comedian[]): string {
    return comedians.map(c => {
      // 本当はequalsメソッド的なのがあった方が良い
      if (c === this) {
        return `${this._getSelfDescription()}のを`;
      } else {
        return `${this._getOtherDescription(c)}のを`;
      }
    }).join("");
  }

  talkOpening(comedians: Comedian[]) {
    const description = this._getDescription(comedians);
    const opening = `${this._getOriginalStreamDescription()}を${description}皆さんに見てもらいます。`;
    console.log(opening);
  }

  talkEnding(comedians: Comedian[]) {
    const description = this._getDescription(comedians);
    const ending = `${this._getOriginalStreamDescription()}を${description}皆さんに見てもらいました。ありがとうございました。`;
    console.log(ending);
  }
}

function recursive_watch(comedians: Comedian[]) {
  if (comedians.length === 0) {
    // 最後まで行ったら元々のYoutubeが流れる。
    originalStream();
    return;
  }

  const currentComedian = comedians[comedians.length - 1];
  if (currentComedian.isFirst) {
    // 動画の最初の人だけオープニングが流れる
    opening();
  }
  currentComedian.talkOpening(comedians);
  // PCを開いて動画を見る。
  recursive_watch(comedians.slice(0, -1));
  currentComedian.talkEnding(comedians);
  ending();
}

function main() {
  const isFirst = true;
  const comedians: Comedian[] = [
    new Comedian("川原", true),
    new Comedian("秋山", true),
    new Comedian("山名", true),
    new Comedian("川西", true),
    new Comedian("石井", true),
    new Comedian("津田", false),
    new Comedian("川原", false),
    new Comedian("秋山", true, isFirst),
  ];
  recursive_watch(comedians);
}

main();
