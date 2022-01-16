import { inject, Injectable } from '../../core/util/bean-factory';
import { Application } from '../model/po/application.model';
import { ApplicationRepository } from '../dao/application.repository';

@Injectable()
export class ApplicationService {
  private applicationRepository: ApplicationRepository = inject(ApplicationRepository);

  findAll(): Application[] {
    return this.applicationRepository.findAll();
  }

  findById(id: string): Application | null {
    return this.applicationRepository.findById(id);
  }

}
