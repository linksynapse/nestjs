import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import * as data from '../../package-lock.json';

@Injectable()
export class DataService {
    private prisma = new PrismaClient();
    private readonly logger = new Logger(DataService.name);

    private getServiceName(){
        const { name } = data;

        return name;
    }

    private getServiceVersion(){
        const { version } = data;

        return version;
    }

    private getServicePackages(){
        const { packages } = data;

        return packages;
    }

    public getServiceStatus(){
        return {
            s6name: this.getServiceName(),
            s6version: this.getServiceVersion(),
        }
    }

    public getFullServiceStatus(){
        return {
            s6name: this.getServiceName(),
            s6version: this.getServiceVersion(),
            s6packages: this.getServicePackages(),
        }
    }
}
