import { Type } from '@angular/core';
import * as decoratorsHack from '@angular/core/esm2015/src/util/decorators';

export const ANNOTATIONS = decoratorsHack.ANNOTATIONS as
  typeof import ('@angular/core/src/util/decorators').ANNOTATIONS;

export const makeDecorator = decoratorsHack.makeDecorator as
  typeof import ('@angular/core/src/util/decorators').makeDecorator;

export function getAnnotationsOfClass<TAnno>(clazz: Type<any>, annoName?: string) {
  if (ANNOTATIONS in clazz) {
    let annos = clazz[ANNOTATIONS] as TAnno[];
    if (annoName) {
      annos = annos.filter((anno: any) => anno.ngMetadataName === annoName);
    }
    return annos;
  }
  return [];
}

export function getClassesOfAnnotations<TAnno>(module: { [key: string]: any }, annoName: string) {
  return Object.values(module)
    .filter(clazz => typeof clazz === 'function')
    .map(clazz => ({
      clazz,
      annos: getAnnotationsOfClass<TAnno>(clazz, annoName),
    }))
    .filter(({ annos }) => annos.length);
}
