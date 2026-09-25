import { test, expect } from '@playwright/test';

test.describe('Acciones en el Automation Sanbox', () => {

    test('Los items del dropdown son los esperados', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })
        await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball']

            for (let opcion of deportes) {
                const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                if (element) {
                    console.log(`La opción '${opcion}' está presente.`);
                } else {
                    throw new Error(`La opción '${opcion}' no está presente.`);
                }
            }
        })
    })

test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
 
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                //Saca una screen y la adjunta aunque el caso pase.
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
 
        })
    


});