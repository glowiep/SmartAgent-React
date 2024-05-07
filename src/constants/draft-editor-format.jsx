export const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] }
    ],
  ]
};

export const formats = [
  "header", "height", "bold", "italic",
  "underline", "blockquote",
  "list", "bullet", "indent",
  "link", "align", "size",
];