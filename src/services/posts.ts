import type { KyInstance } from "ky/distribution/types/ky";
import ky from "ky";

export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface GetPostsOutput {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Post>;
}

export interface SavePostInput {
  username: string;
  title: string;
  content: string;
}

export type EditPostInput = Partial<Omit<SavePostInput, "username">>;

class PostApi {
  private api: KyInstance;

  constructor() {
    this.api = ky.create({
      prefixUrl: "https://dev.codeleap.co.uk/careers/",
    });
  }

  getPosts(): Promise<GetPostsOutput> {
    return this.api.get("").json();
  }

  async savePost(input: SavePostInput): Promise<unknown> {
    return await this.api.post("", { json: input }).json();
  }

  async editPost(id: number | null, input: EditPostInput) {
    if (id === null) {
      return;
    }

    return await this.api.patch(`${id}/`, { json: input }).json();
  }

  async deletePost(id: number | null): Promise<void> {
    console.log("should delete ", id);
    if (id === null) {
      return;
    }

    return await this.api.delete(`${id}/`).json();
  }
}

export const postApi = new PostApi();
