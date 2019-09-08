import {User} from './user';
import {Achievement} from './achievement';

export interface AchievementRequest {
  id: string;
  user: User;
  achievement: Achievement;
  message: string;
}
