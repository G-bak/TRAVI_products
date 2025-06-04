function updatePreview() {
    document.getElementById("previewName").textContent =
    document.getElementById("productName").value || "-";
    document.getElementById("previewSize").textContent =
    document.getElementById("productSize").value || "-";
    document.getElementById("previewWeight").textContent =
    document.getElementById("productWeight").value || "-";
    document.getElementById("previewVoltage").textContent =
    document.getElementById("productVoltage").value || "-";
    document.getElementById("previewPowerConsumption").textContent =
    document.getElementById("productPowerConsumption").value || "-";

    const price = document.getElementById("price").value;
    document.getElementById("previewPrice").textContent = price
      ? `₩${Number(price).toLocaleString()}`
      : "₩0";

    // Boolean 항목 표시 함수
    const showCheck = (id, previewId) => {
        const val = document.getElementById(id).value;
        document.getElementById(previewId).textContent = val === "true" ? "✓" : "-";
    };

    showCheck("wireless_remote", "previewWirelessRemote");
    showCheck("auto_open_close", "previewAutoOpenClose");
    showCheck("auto_flushing", "previewAutoFlushing");
    showCheck("bidet_move", "previewBidetMove");
    showCheck("cleaning_move", "previewCleaningMove");
    showCheck("turbo_wash", "previewTurboWash");
    showCheck("massage_mode", "previewMassageMode");
    showCheck("child_mode", "previewChildMode");
    showCheck("adjust_position", "previewAdjustPosition");
    showCheck("adjust_pressure", "previewAdjustPressure");
    showCheck("adjust_temperature", "previewAdjustTemperature");
    showCheck("soft_open_close", "previewSoftOpenClose");
    showCheck("warm_dry", "previewWarmDry");
    showCheck("toilet_compatibility", "previewToiletCompatibility");
    showCheck("warm_seat", "previewWarmSeat");
    showCheck("led_light", "previewLedLight");
    showCheck("auto_deodorization", "previewAutoDeodorization");
    showCheck("seat_sensor", "previewSeatSensor");
    showCheck("power_saving", "previewPowerSaving");

    // Select 박스에서 텍스트 출력
    const selectText = (id, previewId) => {
        const el = document.getElementById(id);
        document.getElementById(previewId).textContent =
        el.options[el.selectedIndex]?.text || "-";
    };

    selectText("nozzle_material", "previewNozzleMaterial");
    selectText("main_body_waterproof", "previewMainBodyWaterproof");
}

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
    const output = document.getElementById("previewImage");
    output.src = reader.result;
    output.classList.remove("d-none"); // 표시
    };
    reader.readAsDataURL(file);
}

function updateFileName(input) {
    const fileName = input.files[0] ? input.files[0].name : "선택된 파일 없음";
    document.getElementById("imageFileName").textContent = fileName;

    // 파일이 없으면 미리보기 이미지도 지움
    if (!input.files[0]) {
        const preview = document.getElementById("previewImage");
        preview.src = "#";
        preview.classList.add("d-none"); // 다시 숨김
    }
}

function handleDrop(event) {
    event.preventDefault();
    const fileInput = document.getElementById("image");
    const files = event.dataTransfer.files;

    if (files.length > 0) {
    fileInput.files = files;
    previewImage({ target: fileInput });
    updateFileName(fileInput);
    }
}