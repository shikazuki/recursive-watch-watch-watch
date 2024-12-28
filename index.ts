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

function getDescription(names: string[]): string {
  return ["川原さんのYoutubeを"].concat(names.map(name => `${name}さんが見てるのを`)).join("");
}

function recursive_watch(names: string[], isFirst: boolean) {
  // 探索要素が無くなった場合の処理。
  if (names.length === 0) {
    // 最後まで行ったら元々のYoutubeが流れる。
    originalStream();
    return;
  }

  if (isFirst) {
    // 動画の最初の人だけオープニングが流れる
    opening();
  }
  const preDescription = `${getDescription(names)}皆さんに見てもらいます。`;
  console.log(preDescription);

  // 自身を除いた配列にする。実行が終わった要素を除いていくことで処理が終了に向かう
  const previousNames = names.slice(0, -1);
  // PCを開いて動画を見る。
  recursive_watch(previousNames, false);
  const postDescription = `${getDescription(names)}皆さんに見てもらいました。ありがとうございました。`;
  console.log(postDescription);
  ending();
}

function main() {
  const comedianNames = ["川原", "秋山", "山名", "川西"];
  const isFirst = true;
  recursive_watch(comedianNames, isFirst);
}

main();
