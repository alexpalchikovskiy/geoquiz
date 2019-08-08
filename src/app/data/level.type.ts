export class Level {
    question: String;
    answers: {
        text: String,
        right: Boolean
    }[];
    score: Number;
    time: Number;
    last: Boolean;
    data: any;
}