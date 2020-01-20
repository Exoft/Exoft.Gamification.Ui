import {User} from '../user/user';
import {Achievement} from '../achievement/achievement';

export interface AchievementRequest {
  id: string;
  user: User;
  achievement: Achievement;
  message: string;
}
