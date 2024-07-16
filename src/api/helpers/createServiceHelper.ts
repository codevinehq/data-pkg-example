type SERVICE_CALL = (url: string, ...args: any) => any;
type SERVICE_TAGS = readonly string[];

type SERVICE_DEF<TTags, TFn extends SERVICE_CALL> = {
  url: string;
  call: TFn;
  tags?: TTags;
};

type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

export const createService = <TTags, TFn extends SERVICE_CALL>({
  url,
  tags,
  call,
}: SERVICE_DEF<TTags, TFn>) => ({
  url,
  call: (...args: Tail<Parameters<typeof call>>): ReturnType<typeof call> =>
    call(url, ...args),
  tags: tags as TTags extends SERVICE_TAGS ? Required<TTags> : undefined,
});
