/**
 * CapsToCamel<'CARD', '', true>
 *  -> '' + 'card'
 *
 * CapsToCamel<'VIRTUAL_ACCOUNT', '', true>
 *  -> CapsToCamel<'ACCOUNT', '' + 'virtual', false>
 *  -> 'virtual' + 'Account'
 */
type CapsToCamel<PayMethod extends string, Result extends string = '', First extends boolean = true> = PayMethod extends `${infer Front}_${infer Rear}` ? CapsToCamel<Rear, `${Result}${First extends true ? Lowercase<Front> : Capitalize<Lowercase<Front>>}`, false> : `${Result}${First extends true ? Lowercase<PayMethod> : Capitalize<Lowercase<PayMethod>>}`;
type ValueOf<Obj> = Obj[keyof Obj];
type OneOnly<Obj, Key extends keyof Obj> = {
    [key in Exclude<keyof Obj, Key>]+?: undefined;
} & Pick<Obj, Key>;
type OneOfByKey<Obj> = {
    [key in keyof Obj]: OneOnly<Obj, key>;
};
type OneOfType<Obj> = ValueOf<OneOfByKey<Obj>>;
type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export { CapsToCamel, OneOfType, Prettify };
