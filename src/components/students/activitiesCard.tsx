export const ActivitiesCard = ({activity}:any) => {
  return (
    <div className="w-full h-20 border-">
        <div className="flex items-center justify-between w-full h-full px-5">
            <div className="flex items-center space-x-3">
            <span className="text-lg font-bold">{activity.title}</span>
            <span className="text-sm text-muted-foreground">{activity.date}</span>
            </div>
            <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">{activity.time}</span>
            <span className="text-sm text-muted-foreground">{activity.subject}</span>
            </div>
        </div>
    </div>
  )
}
