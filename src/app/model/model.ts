export interface IAPIResponse {
    message: string;
    result: boolean;
    data: any;
}

export interface IEvent{
    eventId: number;
    eventName: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    organizerName: string;
    userId:number;
    price: number;
    location: string;
    imageUrl: string;
    organizerId:number;


}