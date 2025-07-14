ALTER TABLE "goal_completions" DROP CONSTRAINT "goal_completions_goal_id_goals_id_fk";
--> statement-breakpoint
ALTER TABLE "goal_completions" ADD CONSTRAINT "goal_completions_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE cascade ON UPDATE no action;