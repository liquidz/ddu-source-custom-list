import {
  BaseSource,
  Context,
  Item,
} from "https://deno.land/x/ddu_vim@v0.11.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v0.11.0/deps.ts";

import { ActionData } from "../@ddu-kinds/custom-list.ts";

type Params = {
  texts: string[];
  callbackId: string;
};

export class Source extends BaseSource<Params> {
  kind = "custom-list";

  gather(args: {
    denops: Denops;
    context: Context;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(args.sourceParams.texts.map((text) => {
          return {
            word: text,
            action: {
              text: text,
              callbackId: args.sourceParams.callbackId,
            },
          };
        }));

        controller.close();
      },
    });
  }

  params(): Params {
    return {
      texts: [],
      callbackId: "",
    };
  }
}
