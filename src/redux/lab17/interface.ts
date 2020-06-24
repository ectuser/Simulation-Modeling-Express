export interface State{
    error : string | null;
    firstFlowCounter : number;
    secondFlowCounter : number;
    startedStatus : boolean;
};

export enum FlowType{
    first, second
}