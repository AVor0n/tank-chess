/*import {TANK_TYPE } from "../types"
import { Tank } from "./tank";



describe('class Tank - общее', () => {
    let lightTank: Tank;
    beforeEach(() => {
        lightTank = new Tank(TANK_TYPE.LT, 'player_1', '#ffffff', { x: 2, y: 4, rotation: 0 });
    })

    test('Шаг назад расходует всю энергию танка', () => {
        lightTank. reverse();
        expect(lightTank.energy).toBe(0);
    })

    
})

describe('class Tank - легкий танк', () => {
    let lightTank: Tank;
    beforeEach(() => {
        lightTank = new Tank(TANK_TYPE.LT, 'player_1', '#ffffff', { x: 2, y: 4, rotation: 0 });
    })

    test('Правильно присваивается тип танка', () => {
      expect(lightTank.type).toEqual('LT');
    })

    test('Количество ходов легкого такнка равно 5', () => {
        expect(lightTank.energy).toEqual(5);
      })

    test('Броня легкого танка равна 1', () => {
        expect(lightTank.armor).toEqual(1);
    })

    test('Сила удара легкого танка равна 1', () => {
        expect(lightTank.strength).toEqual(1);
    })

    test('Начальный угол поворота равен 0', () => {
        expect(lightTank.position.rotation).toEqual(0);
    })

    test('Не может сделать более 5 шагов подряд', () => {
        let thrownError: unknown = null;
        try {
            lightTank.drive();
            lightTank.drive();
            lightTank.drive();
            lightTank.drive();
            lightTank.drive();
            lightTank.drive()
        }
        catch (error){
            thrownError = error;
        }    
        console.log('======================1!!!!=============');
        console.log(thrownError);
        expect(thrownError).toBeInstanceOf('Error')
        //toThrow(new Error('Не хватает энергии для движения'))

    })


})
*/
export {}
