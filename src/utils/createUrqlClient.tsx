import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { pipe, tap } from 'wonka';
// import { DeletePostMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, VoteMutationVariables } from "../generated/graphql";
// import { betterUpdateQuery } from "./betterUpdateQuery";
// import gql from 'graphql-tag'
import { isServer } from "./isServer";

const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error?.message.includes("Not Authorized")) {
          Router.replace('/login')
        }
      }
    })
  )
}


export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isInCache = cache.resolve(cache.resolveFieldByKey(entityKey, fieldKey) as string, fieldName)
    info.partial = !isInCache
    let hasMore = false
    const results: string[] = []

    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, fieldName) as string[]
      const _hasMore = cache.resolve(key, 'hasMore')
      hasMore = !_hasMore ? false : _hasMore as boolean
      if (data) {
        results.push(...data)
      }
    })

    let typename = "Paginated" + fieldName.charAt(0).toUpperCase() + fieldName.slice(1)

    return {
      __typename: typename,
      hasMore: hasMore,
      [fieldName]: results
    }
  };
};

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(info => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'posts', fi.arguments || {})
  })
}

function invalidateAllAnimes(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(info => info.fieldName === "animes");
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'animes', fi.arguments || {})
  })
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {

  let cookie = ''
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie
  }

  console.log("Api Url: ", process.env.NEXT_PUBLIC_API_URL)
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? {
        cookie
      } : undefined
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          // PaginatedPosts: () => null,
          PaginatedAnimes: () => null
        },
        resolvers: {
          Query: {
            // posts: cursorPagination(),
            animes: cursorPagination()
          }
        },
        updates: {
          // Mutation: {
          //   deletePost: (_result, args, cache, info) => {
          //     cache.invalidate({ __typename: 'Post', id: (args as DeletePostMutationVariables).id })
          //   },
          //   vote: (_result, args, cache, info) => {
          //     const { input } = args as VoteMutationVariables
          //     const data = cache.readFragment(
          //       gql`
          //         fragment _ on Post {
          //           id
          //           points
          //           voteStatus
          //         }
          //       `,
          //       { id: input.postId } as any
          //     )

          //     if (data) {
          //       if (data.voteStatus === input.value) {
          //         return
          //       }
          //       const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * input.value
          //       cache.writeFragment(
          //         gql`
          //           fragment __ on Post {
          //             points
          //             voteStatus
          //           }
          //         `,
          //         { id: input.postId, points: newPoints, voteStatus: input.value } as any
          //       )
          //     }
          //   },
          //   createPost: (_result, args, cache, info) => {
          //     //Here we invalidate Query so client refetches from server
          //     //Reason is that another post might've been posted while you submitted yours
          //     //In that case we want to show most up to date post and not just your new post plus old ones
          //     invalidateAllPosts(cache)
          //   },
          //   logout: (_result, args, cache, info) => {
          //     betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }))
          //   },
          //   login: (_result, args, cache, info) => {
          //     betterUpdateQuery<LoginMutation, MeQuery>(
          //       cache,
          //       { query: MeDocument },
          //       _result,
          //       (result, query) => {
          //         if (result.login.errors) {
          //           return query
          //         }
          //         else {
          //           return {
          //             me: result.login.user
          //           }
          //         }
          //       }
          //     )
          //     invalidateAllPosts(cache)
          //   },
          //   register: (_result, args, cache, info) => {
          //     betterUpdateQuery<RegisterMutation, MeQuery>(
          //       cache,
          //       { query: MeDocument },
          //       _result,
          //       (result, query) => {
          //         if (result.register.errors) {
          //           return query
          //         }
          //         else {
          //           return {
          //             me: result.register.user
          //           }
          //         }
          //       }
          //     )
          //   }

          // }
        }
      }),
      errorExchange,
      ssrExchange,
      fetchExchange
    ]
  }
}