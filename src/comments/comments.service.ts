import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
    async getAllComments() {
        return Promise.resolve(undefined);
    }

    async getCommentById(id: string) {
        return Promise.resolve(undefined);
    }

    async createComment(id: string) {
        return Promise.resolve(undefined);
    }
}
