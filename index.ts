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

interface Comedian {
  name: string;
  shouldWatch: boolean;
}


function getDescription(comedians: Comedian[]): string {
  return ["川原さんのYoutubeを"]
    .concat(comedians.map(comedian => `${comedian.name}さんが${comedian.shouldWatch ? "見てる" : "見てない"}のを`))
    .join("");
}

function recursive_watch(comedians: Comedian[], isFirst: boolean) {
  // 探索要素が無くなった場合の処理。
  if (comedians.length === 0) {
    // 最後まで行ったら元々のYoutubeが流れる。
    originalStream();
    return;
  }

  if (isFirst) {
    // 動画の最初の人だけオープニングが流れる
    opening();
  }
  const preDescription = `${getDescription(comedians)}皆さんに見てもらいます。`;
  console.log(preDescription);

  // 自身を除いた配列にする。実行が終わった要素を除いていくことで処理が終了に向かう
  const previousComedians = comedians.slice(0, -1);
  // PCを開いて動画を見る。
  recursive_watch(previousComedians, false);
  const postDescription = `${getDescription(comedians)}皆さんに見てもらいました。ありがとうございました。`;
  console.log(postDescription);
  ending();
}

function main() {
  const comedians: Comedian[] = [
    { name: "川原", shouldWatch: true },
    { name: "秋山", shouldWatch: true },
    { name: "山名", shouldWatch: true },
    { name: "川西", shouldWatch: true },
    { name: "石井", shouldWatch: true },
    { name: "津田", shouldWatch: false },
    { name: "川原", shouldWatch: false },
    { name: "秋山", shouldWatch: true },
  ];
  const isFirst = true;
  recursive_watch(comedians, isFirst);
}

main();
