export interface State{
    error : string | null;
    firstFlowCounter : number;
    secondFlowCounter : number;
    thirdFlowCounter : number;
    startedStatus : boolean;
    theoreticalAverage : number;
    theoreticalVariance : number;
    intervalCounterThirdFlow : number;
    intervalCounterTotal : number;
    intervalCounterThirdFlowAll : number;
    intervalCounterTotalAll : number;
    interval : number;
    thirdData : number[];
    totalData : number[];
    averageAbsMistakeTotal : number; 
    averageRelativeMistakeTotal : number; 
    varianceAbsMistakeTotal : number; 
    varianceRelativeMistakeTotal : number; 
    averageAbsMistakeThird : number; 
    averageRelativeMistakeThird : number;
    varianceAbsMistakeThird : number; 
    varianceRelativeMistakeThird : number;
};

export enum FlowType{
    first, second, third
}