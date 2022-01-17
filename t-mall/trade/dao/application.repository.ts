import { Injectable } from '../../../core/util/bean-factory';
import { Application } from '../model/po/application.model';

const cache: Application[] = [
  {
    id: 'a5f98333-8a9d-45e5-ae59-617d1806b35c',
    name: '天猫',
  },
  {
    id: '722ffceb-336a-4391-94f9-40d2ddd370c8',
    name: '淘宝',
  },
];

@Injectable()
export class ApplicationRepository {
  findAll(): Application[] {
    return cache;
  }

  findById(id: string): Application | null {
    return cache.find((item) => item.id === id) || null;
  }
}
