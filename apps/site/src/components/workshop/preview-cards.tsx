import {
  ChatCard,
  CreateAccountCard,
  FaqCard,
  GoalCard,
  NotificationsCard,
  PlanCard,
  ReportCard,
  ScheduleCard,
  ShareCard,
  StatsCard,
  TeamCard,
  UploadCard,
} from '@/components/home/cards';

/**
 * The home page's cards, laid out by the preview's own width (container queries) rather than the window's: the
 * workshop's preview is narrower than the page, and the home layout's three columns would overlap in it.
 */
export function PreviewCards() {
  return (
    <div className="@container">
      <div className="grid items-start gap-4 @2xl:grid-cols-2 @7xl:grid-cols-3">
        <div className="grid gap-4">
          <StatsCard />
          <CreateAccountCard />
          <ChatCard />
          <FaqCard />
        </div>
        <div className="grid gap-4">
          <TeamCard />
          <PlanCard />
          <GoalCard />
          <NotificationsCard />
        </div>
        <div className="grid items-start gap-4 @2xl:col-span-2 @2xl:grid-cols-2 @7xl:col-span-1 @7xl:grid-cols-1">
          <ReportCard />
          <ShareCard />
          <UploadCard />
          <ScheduleCard />
        </div>
      </div>
    </div>
  );
}
