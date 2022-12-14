import React from "react";

export default function Counts({ data, item }) {
  let count = 0;

  data.forEach((thing) => {
    if (thing[item]) {
      count = count + JSON.parse(thing[item]).length;
    }
  });

  return count;
}
