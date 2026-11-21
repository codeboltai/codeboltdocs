/**
 * This is a custom Front Matter Component that takes the front matter and renders the api data
 */
import React from "react";
import useFrontMatter from "./useFrontMatter";

const CBAPICategory = () => {
  const frontMatter = useFrontMatter();
  // console.log(frontMatter)
  // console.log(Object.entries(frontMatter))
  return (
    <div>
      {Object.entries(frontMatter).map(([key, value]) => {
        if (key === "cbapicategory" && value) {
          return (
            <ul>
              {value.map((item, index) => {
                const href = item.link.replace(/^\/docs\/api\/apiaccess\//i, '/docs/reference/codeboltjs/api-access/');
                return (
                  <li key={index}>
                    <a href={href}>{item.name}</a> - {item.description}
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CBAPICategory;
