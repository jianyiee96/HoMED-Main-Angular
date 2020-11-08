import { NotificationTypeEnum } from '../notificationtype-enum'
import { Serviceman } from '../serviceman/serviceman'

export class Notification {

    notificationId: number
    notificationDate: Date
    title: string
    message: string
    isRead: boolean
    isFetched: boolean
    serviceman: Serviceman
    dynamicId: number
    notificationTypeEnum: NotificationTypeEnum

    constructor(
        notificationId?: number,
        notificationDate?: Date,
        title?: string,
        message?: string,
        isRead?: boolean,
        isFetched?: boolean,
        serviceman?: Serviceman,
        dynamicId?: number,
        notificationTypeEnum?: NotificationTypeEnum
    ) {

        this.notificationId = notificationId
        this.notificationDate = notificationDate
        this.title = title
        this.message = message
        this.isRead = isRead
        this.isFetched = isFetched
        this.serviceman = serviceman
        this.dynamicId = dynamicId
        this.notificationTypeEnum = notificationTypeEnum
    }

}
