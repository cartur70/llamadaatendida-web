# Cómo editar las tarifas del simulador de ahorro

Esta guía explica, sin necesidad de saber programar, cómo cambiar los números que usa el simulador de ahorro ("¿Cuánto ahorrarías...?") que aparece en la página de inicio y en la página de Atención 24/7. Es el **mismo simulador** en las dos páginas: un solo archivo de tarifas controla ambos.

## Dónde están las tarifas

Todos los importes y porcentajes viven en un único archivo:

```
public/config/tarifas.json
```

Cuando la web está publicada en el hosting, este mismo archivo está en:

```
public_html/config/tarifas.json
```

Puedes editarlo, guardarlo y los cambios se verán en la web **sin tocar ningún otro archivo y sin volver a generar (compilar) la web**. Basta con recargar la página en el navegador.

## Qué significa cada campo

El archivo es un JSON: un bloque de texto con pares `"nombre": valor` separados por comas, entre llaves `{ }`. Estos son los campos que entiende el simulador:

| Campo | Qué es | Valor actual |
|---|---|---|
| `llamadasPorEmpleado` | Cuántas llamadas al mes puede atender, de media, un teleoperador humano. | 600 |
| `costeEmpleadoMes` | Coste mensual de un teleoperador humano, todo incluido (sueldo, Seguridad Social, formación, rotación de personal). En euros. | 2200 |
| `costeLlamadaIA` | Lo que cuesta cada llamada atendida por nuestro sistema híbrido (IA + humanos), en horario normal. En euros por llamada. | 1.2 |
| `factorCobertura247Humano` | Cuánto más cuesta un equipo humano si tiene que cubrir 24 horas, 7 días a la semana (turnos de noche, fines de semana, festivos). Es un multiplicador: 2.5 significa "2,5 veces más caro". | 2.5 |
| `factorCobertura247IA` | Lo mismo pero para nuestro sistema: cuánto se encarece la tarifa por llamada al activar cobertura 24/7. También es un multiplicador: 1.2 significa "un 20% más caro". | 1.2 |
| `minLlamadas` | Valor mínimo que se puede seleccionar en el control deslizante del simulador. | 100 |
| `maxLlamadas` | Valor máximo que se puede seleccionar en el control deslizante. | 5000 |
| `stepLlamadas` | De cuánto en cuánto se mueve el control deslizante (saltos de 50 en 50, por ejemplo). | 50 |
| `defaultLlamadas` | Valor con el que arranca el simulador la primera vez que alguien lo ve. | 1200 |

El campo `_aviso` es solo una nota para quien edite el archivo; el simulador lo ignora por completo, puedes dejarlo, cambiarlo o borrarlo sin que afecte a nada.

## Cómo se calcula el ahorro, paso a paso

Vamos a calcularlo a mano para **1.200 llamadas al mes, sin cobertura 24/7**, con los valores actuales de la tabla de arriba.

**1. ¿Cuántos teleoperadores humanos harían falta?**

Se divide las llamadas entre la capacidad de un empleado, y se redondea siempre hacia arriba (no se puede contratar "1,5 personas"):

```
empleados = redondear hacia arriba (1.200 / 600) = 2 personas
```

**2. ¿Cuánto costaría ese equipo humano al mes?**

```
coste humano = 2 personas × 2.200 € = 4.400 € / mes
```

(Si la cobertura 24/7 estuviera activada, este importe se multiplicaría además por `factorCobertura247Humano`: 4.400 € × 2,5 = 11.000 €.)

**3. ¿Cuánto costaría atender esas mismas llamadas con nosotros?**

```
tarifa por llamada = 1,2 € (si hubiera 24/7 activo, sería 1,2 € × 1,2 = 1,44 €)
coste con Llamada Atendida = 1.200 llamadas × 1,2 € = 1.440 € / mes
```

**4. ¿Cuánto se ahorra al mes y al año?**

```
ahorro mensual = coste humano − coste con Llamada Atendida
ahorro mensual = 4.400 € − 1.440 € = 2.960 € / mes

ahorro anual = ahorro mensual × 12 = 35.520 € / año

porcentaje de ahorro = ahorro mensual / coste humano
porcentaje de ahorro = 2.960 / 4.400 = 67 %
```

Esto es exactamente lo que el simulador muestra en pantalla para 1.200 llamadas sin 24/7: **4.400 €** (equipo humano), **1.440 €** (Llamada Atendida), **2.960 € al mes / 35.520 € al año, un 67 % menos**.

### Qué cambia al activar el interruptor "Cobertura 24/7"

Al activarlo, los dos costes se recalculan con los multiplicadores de cobertura 24 horas:

- El coste humano se multiplica por `factorCobertura247Humano` (2,5): cubrir noches, fines de semana y festivos con personas sale mucho más caro, porque hacen falta turnos rotativos.
- La tarifa por llamada de Llamada Atendida se multiplica por `factorCobertura247IA` (1,2): nuestro sistema también sube de precio para dar cobertura total, pero mucho menos, porque la IA no necesita turnos ni pluses nocturnos.

El resultado es que, con 24/7 activado, el ahorro (en euros y en porcentaje) **siempre es mayor**, porque el coste humano crece mucho más deprisa que el nuestro.

### Si algún día el ahorro saliera negativo

Si alguien introduce tarifas poco realistas (por ejemplo, una `costeLlamadaIA` disparatadamente alta), podría darse el caso de que nuestro coste superase al humano. El simulador **nunca muestra un número en rojo ni un "-500 €" confuso**: en ese caso, en vez del importe, se ve el texto **"Sin ahorro estimado"** y el porcentaje pasa a 0 %. Con los valores actuales de `tarifas.json` esto no ocurre en ningún punto del simulador (de 100 a 5.000 llamadas, con o sin 24/7).

## Cómo editar `tarifas.json`

### En tu ordenador (local)

1. Abre la carpeta del proyecto y ve a `public/config/`.
2. Abre `tarifas.json` con el Bloc de notas (o cualquier editor de texto simple — no uses Word).
3. Cambia solo los números que necesites, sin tocar las comillas `"` ni las comas `,` ni las llaves `{ }`. Por ejemplo, para subir el coste del empleado a 2.400 €:
   ```
   "costeEmpleadoMes": 2400,
   ```
4. Guarda el archivo (Ctrl+S), con el mismo nombre y en el mismo sitio.
5. Si tienes la web abierta, recarga la página (F5) para ver el cambio.

### En el hosting (cPanel)

1. Entra en cPanel y abre el **Administrador de archivos** ("File Manager").
2. Navega hasta `public_html/config/`.
3. Haz clic derecho sobre `tarifas.json` → **Editar** (o "Code Editor").
4. Cambia los números que necesites (igual que en el paso anterior) y pulsa **Guardar cambios**.
5. Visita la web y recarga la página con Ctrl+F5 (recarga forzada, para asegurarte de que no usas una copia antigua guardada en el navegador).

> Importante: edita solo los **números**. No borres comillas, comas ni llaves, y no añadas texto suelto — si el archivo deja de ser un JSON válido, el simulador simplemente lo ignorará por completo y usará las cifras de seguridad que lleva integradas (ver más abajo), sin que se rompa nada ni se muestre ningún error a quien visite la web.

## Cómo comprobar que el cambio se ha aplicado

1. Abre la página de inicio (o la de Atención 24/7) en el navegador.
2. Recarga con Ctrl+F5.
3. Mira el resultado del simulador para el valor de llamadas que esté seleccionado — si cambiaste, por ejemplo, `costeEmpleadoMes`, el importe de "Equipo de teleoperadores" debería reflejarlo inmediatamente.
4. Si quieres comprobarlo de forma más técnica: abre la dirección `tudominio.com/config/tarifas.json` directamente en el navegador — debería mostrarte el contenido del archivo tal cual lo guardaste. Si ves un error 404, el archivo no está en la carpeta correcta.

## Qué pasa si el archivo tiene un error

El simulador está diseñado para que un error en `tarifas.json` **nunca lo rompa ni se note de cara al visitante**:

- **Si el archivo no existe o no se puede leer**: el simulador sigue funcionando igual que siempre, usando unas cifras de seguridad que lleva guardadas internamente (las mismas que hay hoy en `tarifas.json`). El visitante no ve ningún error.
- **Si un campo en concreto tiene un valor inválido** (por ejemplo, escribiste `"costeEmpleadoMes": "dos mil"` en vez de un número, o un número negativo o en cero): solo ese campo en concreto se ignora y se usa su cifra de seguridad; el resto de campos que sí estén bien escritos se aplican con normalidad.
- **Si `minLlamadas` es mayor o igual que `maxLlamadas`** (un rango sin sentido, como mínimo 5000 y máximo 100): se ignoran los dos y se usan ambos valores de seguridad, para que el control deslizante del simulador siga funcionando.

En resumen: como mucho, un error de edición hace que ese campo concreto vuelva a su valor anterior — nunca que el simulador deje de funcionar o muestre un mensaje de error en la web.
