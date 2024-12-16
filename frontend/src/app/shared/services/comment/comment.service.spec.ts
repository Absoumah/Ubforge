import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { Comment } from '../../models/comment';

describe('CommentService', () => {
    let service: CommentService;
    let httpMock: HttpTestingController;

    const mockComment: Comment = {
        id: 1,
        content: 'Test comment',
        author: 'Test Author',
        entityId: 1,
        entityType: 'issue',
        createdAt: new Date()
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentService]
        });
        service = TestBed.inject(CommentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get comments by task id', () => {
        const taskId = 1;
        const mockComments: Comment[] = [mockComment];

        service.getCommentsByTaskId(taskId).subscribe(comments => {
            expect(comments).toEqual(mockComments);
        });

        const req = httpMock.expectOne(`http://localhost:8081/comment/getByTaskId/${taskId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockComments);
    });

    it('should get comments by issue id', () => {
        const issueId = 1;
        const mockComments: Comment[] = [mockComment];

        service.getCommentsByIssueId(issueId).subscribe(comments => {
            expect(comments).toEqual(mockComments);
        });

        const req = httpMock.expectOne(`http://localhost:8081/comment/getByIssueId/${issueId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockComments);
    });

    it('should add new comment', () => {
        const newComment: Omit<Comment, 'id' | 'createdAt'> = {
            content: 'New comment',
            author: 'Test Author',
            entityId: 1,
            entityType: 'issue'
        };

        service.addComment('issue', 1, newComment).subscribe(comment => {
            expect(comment).toEqual(mockComment);
        });

        const req = httpMock.expectOne('http://localhost:8081/comment/add');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ ...newComment, entityType: 'issue', entityId: 1 });
        req.flush(mockComment);
    });
});