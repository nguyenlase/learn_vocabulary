export interface IButtons {
    name: string;
    event: () => void;
}

export interface IInput {
    type: string;
    placeholder: string;
    id: string;
    registerName: string;
    functionHandler: (e: string) => void;
    nameLabel: string;
    value?: string;
}

export interface ChildrenProps {
    children: JSX.Element;
}

export interface LoginUserProps {
    userEmail: string;
    password: string;
    remember: boolean;
}

export interface UserLoginProps {
    userEmail: string;
    password: string;
    remember: boolean;
}

export interface IHandleAuth {
    authType: string;
}

export interface UserSignUpProps {
    userEmail: string;
    password: string;
    userName: string;
    confirmPassword: string;
    remember: boolean;
}

export interface VocabProps {
    UserID: number;
    EnglishWord: string;
    Vietnamese: string;
    UserEmail: string;
    VocabularyID: number;
}

export interface PaginateProps {
    length: number;
    pageFunction: (e: { selected: number }) => void;
}

export interface getAllBYPage {
    userEmail: string;
    page: number;
}

export interface test {
    length: number;
}

export interface UpdateAndDeleteProps {
    englishWord: string;
    vietnameseWord: string;
    vocabID: number;
    fnModal: (e: boolean) => void;
}

export interface UpdateProps {
    vocabularyID: number;
    englishWord: string;
    vietnameseWord: string;
}

export interface SearchProps {
    EnglishWord: string;
    Vietnamese: string;
}