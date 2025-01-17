/// <reference types="jest" />
export declare type PartialObjectMock<T> = {
  [P in keyof T]?: jest.Mock<Partial<T[P]>> | T[P];
};
