export function resolve(path: any, obj?: any | undefined) {
  return path.split('.').reduce(function(prev: any, curr: any) {
      return prev ? prev[curr] : null
  }, obj || self)
}