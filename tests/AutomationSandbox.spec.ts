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
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
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

    test('Valido que los valores de la tabla dinámica cambian al hacer un reload', async ({ page }) => {

        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Valido que todos los valores cambiaron al hacer un reload a la web', async () => {
            //Creamos un arreglo con todos los valores de la tabla dinámica antes del reload
            const valoresTabladinamicaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log('Valores de la tabla dinámica antes del reload:', valoresTabladinamicaDinamica);

            //Hacemos un reload a la página
            await page.reload();

            //Creamos un arreglo con todos los valores de la tabla dinámica después del reload
            const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log('Valores de la tabla dinámica después del reload:', valoresPostReload);

            //Validamos que los valores de la tabla dinámica antes del reload no sean iguales a los valores después del reload
            expect(valoresTabladinamicaDinamica).not.toEqual(valoresPostReload);
        })


    })

    test('Ejemplo de Soft Assertions', async ({ page }) => {

        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
            await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
        })

    })

    test('Validando dentro de un popup', async ({ page }) => {
        await test.step('Dado que navego al sandbox', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Cuando hago click en el botón popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
        })

        await test.step('Puedo validar un elemento dentro del popup', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'Cerrar' }).click();

        })


    })



});