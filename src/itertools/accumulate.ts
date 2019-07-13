import { Predicate, UnaryOperator, BinaryOperator } from "./index";
import { filter, find } from "./filter";
import { map } from "./map";
import { last } from "./slice";

const identity = <T>(t: T): T => t;

export function* accumulate<T, R>(iterable: Iterable<T>, operator: BinaryOperator<T, R>, value: R): Iterable<R> {
    for (const item of iterable) {
        yield value = operator(value, item);
    }
}

export const reduce = <T, R>(iterable: Iterable<T>, operator: BinaryOperator<T, R>, value: R): R =>
    last(accumulate(iterable, operator, value));

export const sum = (iterable: Iterable<number>): number =>
    reduce(iterable, (value, item) => value + item, 0);

export const sumBy = <T>(iterable: Iterable<T>, operator: UnaryOperator<T, number>): number =>
    sum(map(iterable, operator));

export const count = <T>(iterable: Iterable<T>): number =>
    reduce(iterable, total => ++total, 0);

export const countIf = <T>(iterable: Iterable<T>, predicate: Predicate<T>): number =>
    count(filter(iterable, predicate));

export const none = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    find(map(iterable, predicate), identity) == null;

export const some = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    find(map(iterable, predicate), identity) != null;

export const all = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    none(iterable, item => !predicate(item));

export const one = <T>(iterable: Iterable<T>, predicate: Predicate<T>): boolean =>
    Array.from(filter(iterable, predicate)).length === 1;