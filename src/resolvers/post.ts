import {Resolver, Query, Ctx} from 'type-graphql';
import {MyContextType} from '../types'
import { Post } from '../entities/Post';

@Resolver()
export class PostResolver {
    @Query(()=>[Post])
    posts(
        // accessing em through pass context from apollo
        @Ctx() {em}: MyContextType
    ): Promise<Post[]>
    {
        return em.find(Post, {});
    }
}