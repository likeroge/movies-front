import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IFetchConfig } from "../../App";
import "./content-list.scss";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IContentListProps {
  fetchConfig: IFetchConfig;
}

export const ContentList: FC<IContentListProps> = ({ fetchConfig }) => {
  let url = "https://jsonplaceholder.typicode.com/posts";

  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    async function fetchData() {
      let { data } = await axios.get(url);
      if (fetchConfig.text) {
        data = data.filter((el: IPost) => el.id < 10);
      }
      setPosts(data);
    }
    fetchData();
  }, [fetchConfig.text]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
};
