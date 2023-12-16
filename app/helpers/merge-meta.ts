import type { LoaderFunction, MetaFunction } from '@remix-run/node';

export const mergeMeta = <
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
    string,
    unknown
  >,
>(
  leafMetaFn: MetaFunction<Loader, ParentsLoaders>
): MetaFunction<Loader, ParentsLoaders> => {
  return (metaArg) => {
    // Get metadata for the current leaf route
    const leafMeta = leafMetaFn(metaArg);

    // Reduce the matches from right to left
    return metaArg.matches.reduceRight((accumulator, currentValue) => {
      // Filter metadata of the current route
      const metaValue = currentValue.meta.filter(
        (parentMeta) =>
          // Check if similar metadata is not already in the accumulator
          !accumulator.some((meta) => isSameMetadata(meta, parentMeta))
      );

      // Concatenate the filtered metadata to the accumulator
      return [...accumulator, ...metaValue];
    }, leafMeta);
  };
};

function isSameMetadata(metaA: any, metaB: any) {
  // Check if both objects have the same property
  const hasSameProperty = (property: string): boolean =>
    property in metaA &&
    property in metaB &&
    metaA[property] === metaB[property];

  // Check if the name, property, and title are the same
  return (
    hasSameProperty('name') ||
    hasSameProperty('property') ||
    ('title' in metaA && 'title' in metaB)
  );
}

// export const mergeMeta = <
//   Loader extends LoaderFunction | unknown = unknown,
//   ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
//     string,
//     unknown
//   >,
// >(
//   leafMetaFn: MetaFunction<Loader, ParentsLoaders>
// ): MetaFunction<Loader, ParentsLoaders> => {
//   return (metaArg) => {
//     // Get metadata for the current leaf route
//     const leafMeta = leafMetaFn(metaArg);

//     // Reduce the matches from right to left
//     return metaArg.matches.reduceRight((accumulator, currentValue) => {
//       // Iterate over metadata of the current route
//       for (const parentMeta of currentValue.meta) {
//         // Find the index of a similar metadata in the accumulator
//         const index = accumulator.findIndex((meta) =>
//           isSameMetadata(meta, parentMeta)
//         );
//         // If similar metadata not found in the accumulator, add it
//         if (index === -1) accumulator = [...accumulator, parentMeta];
//       }
//       return accumulator;
//     }, leafMeta);
//   };
// };
