export declare const createAssignmentService: (data: any) => Promise<{
    message: string;
    assignments: {
        id: string;
        title: string;
        description: string;
        dueDate: Date;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    assignment?: never;
} | {
    message: string;
    assignment: {
        id: string;
        title: string;
        description: string;
        dueDate: Date;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
    };
    assignments?: never;
}>;
export declare const getAllAssignmentsService: (page?: number, limit?: number, mentorId?: string) => Promise<{
    message: string;
    assignments: {
        id: string;
        title: string;
        description: string;
        dueDate: Date;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare const getAssignmentByIdService: (id: string) => Promise<{
    message: string;
    assignment: {
        id: string;
        title: string;
        description: string;
        dueDate: Date;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
export declare const updateAssignmentService: (id: string, data: any, mentorId?: string) => Promise<{
    message: string;
    assignment: {
        id: string;
        title: string;
        description: string;
        dueDate: Date;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
export declare const deleteAssignmentService: (id: string, mentorId?: string) => Promise<{
    message: string;
}>;
export declare const assignToStudentsService: (assignmentId: string, data: any, mentorId?: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=assignment.service.d.ts.map