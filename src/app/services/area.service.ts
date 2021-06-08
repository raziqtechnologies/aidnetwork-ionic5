import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { AreaGroup } from '../add-aidarea/types/areagroup.type';
import { Area } from '../add-aidarea/types/area.type';


@Injectable(
{ providedIn: 'root'}
  
)
export class AreaService {
  private countries: AreaGroup[] = [new AreaGroup({
    id: 0,
    name: 'Japan',
    areas: [
      new Area({ id: 0, name: 'Tokai' })
    ]
  }), new AreaGroup({
    id: 2,
    name: 'Russia',
    state: 'ru',
    areas: [
      new Area({ id: 2, name: 'Vladivostok' })
    ]
  }), new AreaGroup({
    id: 3,
    name: 'India',
    state: 'in',
    areas: [
      new Area({ id: 3, name: 'Navlakhi' })
    ]
  }), new AreaGroup({
    id: 4,
    name: 'Cayman Islands',
    state: 'ky',
    areas: [
      new Area({ id: 4, name: 'Cayman Brac' })
    ]
  }), new AreaGroup({
    id: 6,
    name: 'Egypt',
    state: 'eg',
    areas: [
      new Area({ id: 6, name: 'Area Ibrahim' })
    ]
  }), new AreaGroup({
    id: 7,
    name: 'Finland',
    state: 'fi',
    areas: [
      new Area({ id: 7, name: 'Brahestad' }),
      new Area({ id: 37, name: 'Kantvik' })
    ]
  }), new AreaGroup({
    id: 8,
    name: 'Germany',
    state: 'ge',
    areas: [
      new Area({ id: 8, name: 'Brake' })
    ]
  }), new AreaGroup({
    id: 9,
    name: 'Canada',
    state: 'ca',
    areas: [
      new Area({ id: 9, name: 'Hantsport NS' })
    ]
  }), new AreaGroup({
    id: 11,
    name: 'Chile',
    state: 'cl',
    areas: [
      new Area({ id: 11, name: 'Antofagasta' }),
      new Area({ id: 12, name: 'San Antonio' }),
      new Area({ id: 13, name: 'Santa Barbara' })
    ]
  }), new AreaGroup({
    id: 12,
    name: 'Argentina',
    state: 'ar',
    areas: [
      new Area({ id: 14, name: 'Cabo San Antonio' }),
      new Area({ id: 15, name: 'Diamante' }),
      new Area({ id: 16, name: 'San Antonio Este Arg' }),
      new Area({ id: 44, name: 'Santa Cruz' })
    ]
  }), new AreaGroup({
    id: 13,
    name: 'Curacao',
    state: 'cw',
    areas: [
      new Area({ id: 17, name: 'Santa Anna Bay' })
    ]
  }), new AreaGroup({
    id: 14,
    name: 'Sri Lanka',
    state: 'lk',
    areas: [
      new Area({ id: 18, name: 'Hambantota' })
    ]
  }), new AreaGroup({
    id: 15,
    name: 'Madagascar',
    state: 'mg',
    areas: [
      new Area({ id: 19, name: 'Antananarivo' })
    ]
  }), new AreaGroup({
    id: 5,
    name: 'Brazil',
    state: 'br',
    areas: [
      new Area({ id: 51, name: 'Areia Branca' }),
      new Area({ id: 52, name: 'Navegantes' }),
      new Area({ id: 53, name: 'Antonina' }),
      new Area({ id: 54, name: 'Santos' }),
      new Area({ id: 55, name: 'Paranagua' }),
      new Area({ id: 56, name: 'Sao Francisco do Sul' }),
      new Area({ id: 57, name: 'Angra dos Reis' }),
      new Area({ id: 58, name: 'Rio de Janeiro' }),
      new Area({ id: 59, name: 'Vitoria' }),
      new Area({ id: 60, name: 'Areao Alegre' }),
      new Area({ id: 61, name: 'Itajai' }),
      new Area({ id: 62, name: 'Imbituba' }),
      new Area({ id: 63, name: 'Pelotas' }),
      new Area({ id: 64, name: 'Tubarao' }),
      new Area({ id: 65, name: 'Fortaleza' }),
      new Area({ id: 66, name: 'Cabedelo' }),
      new Area({ id: 67, name: 'Sao Luis' }),
      new Area({ id: 68, name: 'Natal' }),
      new Area({ id: 69, name: 'Trombetas' })
    ]
  }), new AreaGroup({
    id: 16,
    name: 'Ireland',
    state: 'ie',
    areas: [
      new Area({ id: 21, name: 'Bantry Bay' })
    ]
  }), new AreaGroup({
    id: 17,
    name: 'Italy',
    state: 'it',
    areas: [
      new Area({ id: 22, name: 'Areao Levante' })
    ]
  }), new AreaGroup({
    id: 18,
    name: 'Greece',
    state: 'gr',
    areas: [
      new Area({ id: 23, name: 'Area of Antikyra' })
    ]
  }), new AreaGroup({
    id: 19,
    name: 'Malaysia',
    state: 'my',
    areas: [
      new Area({ id: 38, name: 'Kuantan' }),
      new Area({ id: 24, name: 'Berantai FPSO' })
    ]
  }), new AreaGroup({
    id: 20,
    name: 'Spain',
    state: 'es',
    areas: [
      new Area({ id: 25, name: 'Alicante' }),
      new Area({ id: 45, name: 'Santa Eugenia De Riveira' })
    ]
  }), new AreaGroup({
    id: 21,
    name: 'Panama',
    state: 'pa',
    areas: [
      new Area({ id: 26, name: 'Almirante' })
    ]
  }), new AreaGroup({
    id: 22,
    name: 'China',
    state: 'cn',
    areas: [
      new Area({ id: 39, name: 'Lantian' }),
      new Area({ id: 27, name: 'Canton' }),
      new Area({ id: 42, name: 'Nantong' })
    ]
  }), new AreaGroup({
    id: 23,
    name: 'Somalia',
    state: 'so',
    areas: [
      new Area({ id: 28, name: 'Dante' })
    ]
  }), new AreaGroup({
    id: 24,
    name: 'United States',
    state: 'us',
    areas: [
      new Area({ id: 29, name: 'Davant LA' })
    ]
  }), new AreaGroup({
    id: 25,
    name: 'Australia',
    state: 'au',
    areas: [
      new Area({ id: 30, name: 'Fremantle' })
    ]
  }), new AreaGroup({
    id: 26,
    name: 'Philippines',
    state: 'ph',
    areas: [
      new Area({ id: 31, name: 'General Santos' })
    ]
  }), new AreaGroup({
    id: 27,
    name: 'United Kingdom',
    state: 'gb',
    areas: [
      new Area({ id: 32, name: 'Granton' })
    ]
  }), new AreaGroup({
    id: 28,
    name: 'Venezuela',
    state: 've',
    areas: [
      new Area({ id: 33, name: 'Guanta' })
    ]
  }), new AreaGroup({
    id: 29,
    name: 'Indonesia',
    state: 'id',
    areas: [
      new Area({ id: 35, name: 'Kalimantan' })
    ]
  }), new AreaGroup({
    id: 30,
    name: 'Thailand',
    state: 'th',
    areas: [
      new Area({ id: 36, name: 'Kantang' })
    ]
  }), new AreaGroup({
    id: 31,
    name: 'Ecuador',
    state: 'ec',
    areas: [
      new Area({ id: 40, name: 'Manta' })
    ]
  }), new AreaGroup({
    id: 32,
    name: 'France',
    state: 'fr',
    areas: [
      new Area({ id: 41, name: 'Mantes' })
    ]
  })];
  private areasObservable: Observable<Area[]>;

  getAreagroups(page?: number, size?: number): AreaGroup[] {
    let countries = [];

    if (page && size) {
      countries = this.countries.slice((page - 1) * size, ((page - 1) * size) + size);
    } else {
      countries = this.countries;
    }

    return countries;
  }

  getAreas(page?: number, size?: number): Area[] {
    let areas = [];

    this.countries.forEach(areagroup => {
      areagroup.areas.forEach(port => {
        port.areagroup = areagroup;
        areas.push(port);
      });
    });

    if (page && size) {
      areas = areas.slice((page - 1) * size, ((page - 1) * size) + size);
    }

    return areas;
  }

  getAreasAsync(page?: number, size?: number, timeout = 1000): Observable<Area[]> {
    if (this.areasObservable) {
      return this.areasObservable;
    }

    this.areasObservable = new Observable<Area[]>(observer => {
      observer.next(this.getAreas(page, size));
      observer.complete();
    }).pipe(
      delay(timeout),
      share()
    );

    this.areasObservable.subscribe(() => {
      // Remove completed observable.
      this.areasObservable = null;
    });

    return this.areasObservable;
  }

  filterAreas(areas: Area[], text: string): Area[] {
    return areas.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port.areagroup.name.toLowerCase().indexOf(text) !== -1;
    });
  }

  getNewAreaId(): number {
    return this.getAreas().map(port => port.id).sort((portId1, portId2) => {
      return portId1 > portId2 ? -1 : 1;
    })[0] + 1;
  }

  addArea(port: Area) {
    port.id = this.getNewAreaId();
    this.countries.find(areagroup => {
      return areagroup.id === port.areagroup.id;
    }).areas.push(port);
  }

  addAreaAsync(port: Area, timeout = 1000): Observable<any> {
    let self = this;

    return new Observable<any>(observer => {
      self.addArea(port);
      observer.next();
      observer.complete();
    }).pipe(delay(timeout));
  }

  deleteArea(port: Area) {
    let areagroup = this.countries.find(areagroup => {
      return areagroup.id === port.areagroup.id;
    });

    if (areagroup && areagroup.areas) {
      areagroup.areas = areagroup.areas.filter(_port => {
        return _port.id !== port.id;
      });
    }
  }

  deleteAreaAsync(port: Area, timeout = 1000): Observable<any> {
    let self = this;

    return new Observable<any>(observer => {
      self.deleteArea(port);
      observer.next();
      observer.complete();
    }).pipe(delay(timeout));
  }

  isInteger(value: any): boolean {
    return value === parseInt(value, 10);
  }

  formatNumber(value: number, length: number): string {
    let formattedNumber = '';

    for (let i = 0; i < length; i++) {
      formattedNumber += '0';
    }

    return (formattedNumber + value).slice(-length);
  }

  formatTimeZone(offset: number): string {
    if (offset === 0) {
      return 'Z';
    }

    if (!this.isInteger(offset)) {
      return '';
    }

    // Time zones vary from -12:00 to 14:00.
    if (offset < -720 || offset > 840) {
      return '';
    }

    let sign = '+';

    if (offset < 0) {
      offset *= -1;
      sign = '-';
    }

    let minutes = offset % 60,
      hours = (offset - minutes) / 60;

    return sign + this.formatNumber(hours, 2) + ':' + this.formatNumber(minutes, 2);
  }
}
