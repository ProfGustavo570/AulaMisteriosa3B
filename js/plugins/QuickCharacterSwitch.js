/*:
 * @target MZ
 * @plugindesc Troca rápida de personagens com teclas numéricas (1–8)
 * @help
 * Cada número do teclado (1 a 8) troca para o personagem correspondente.
 * Configure os IDs dos atores no array abaixo.
 */

(() => {
    const actorIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // IDs dos seus personagens no banco de dados

    function switchActorByIndex(index) {
        if (index >= 0 && index < actorIds.length) {
            $gameParty._actors = [actorIds[index]];
            $gamePlayer.refresh(); // Atualiza sprite no mapa
        }
    }

    // Captura de teclas numéricas
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);

        for (let i = 0; i < actorIds.length; i++) {
            const key = (i + 1).toString(); // "1", "2", "3"...
            if (Input.isTriggered(key)) {
                switchActorByIndex(i);
            }
        }
    };

    // Registrar teclas extras (números)
    for (let i = 1; i <= 9; i++) {
        Input.keyMapper[48 + i] = i.toString(); // 49 = tecla "1", 50 = "2"...
    }
})();

