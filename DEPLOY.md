# 🚀 Despliegue con Cron

Este proyecto utiliza un **Job de Cron** para automatizar la ejecución del script principal. Sigue las instrucciones a continuación para configurar el entorno de producción.

### ⚙️ Configuración del Crontab

Copia y pega las siguientes líneas ejecutando `crontab -e` en tu terminal para programar la ejecución diaria a las **09:01 AM**:

```bash
# Configuración del entorno
SHELL=/bin/bash
PATH=/home/ubuntuia/.local/bin:/usr/local/bin:/usr/bin:/bin

# Tarea programada: Ejecución diaria a las 9:01 AM
1 9 * * * cd /home/ubuntuia/Escritorio/personal-projects/learning-claude && ./run-in-loop.sh 2 >> /tmp/run-in-loop.log 2>&1

```

### 📝 Notas de Operación

* **Logs:** La salida y los errores se almacenan en `/tmp/run-in-loop.log`.
* **Rutas:** Asegúrate de que el directorio `/home/ubuntuia/...` sea válido en el servidor de destino.
* **Permisos:** El script debe tener permisos de ejecución (`chmod +x run-in-loop.sh`).
