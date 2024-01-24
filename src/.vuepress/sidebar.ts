import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "题解",
      icon: "lightbulb",
      prefix: "posts/",
      children: "structure",
    },
  ],
});
