function updatePreview() {
    document.getElementById("previewName").textContent =
    document.getElementById("productName").value || "-";
    document.getElementById("previewSize").textContent =
    document.getElementById("productSize").value || "-";
    document.getElementById("previewWeight").textContent =
    document.getElementById("productWeight").value || "-";
    document.getElementById("previewWaterCapacity").textContent =
    document.getElementById("productWaterCapacity").value || "-";
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

    showCheck("uv_sterilization", "previewUvSterilization");
    showCheck("pre_infusion", "previewPreInfusion");
    showCheck("heating_system", "previewHeatingSystem");
    showCheck("bypass", "previewBypass");
    showCheck("drain_trap", "previewDrainTrap");
    showCheck("direct_water_supply", "previewDirectWaterSupply");
    showCheck("auto_sucking_water_supply", "previewAutoSuckingWaterSupply");
    showCheck("jog_dial", "previewJogDial");
    showCheck("steam_features", "previewSteamFeatures");
    showCheck("separate_hot_water_extraction", "previewSeparateHotWaterExtraction");
    showCheck("safe_cleaning", "previewSafeCleaning");
    showCheck("nozzle_sliding", "previewNozzleSliding");
    showCheck("detachable_for_cleaning", "previewDetachableForCleaning");
    showCheck("espresso_double_shot", "previewEspressoDoubleShot");


    // Select 박스에서 텍스트 출력
    const selectText = (id, previewId) => {
        const el = document.getElementById(id);
        document.getElementById(previewId).textContent =
        el.options[el.selectedIndex]?.text || "-";
    };

    selectText("pump_pressure", "previewPumpPressure");
    selectText("extraction_pressure", "previewExtractionPressure");
    selectText("grind_size", "previewGrindSize");
    selectText("number_of_beverages_extractable", "previewNumberOfBeveragesExtractable");
    selectText("expandable_bean_hopper", "previewExpandableBeanHopper");
    selectText("expandable_cake_box", "previewExpandableCakeBox");
    selectText("built_in_cake_box_max_capacity", "previewBuiltInCakeBoxMaxCapacity");
    selectText("display", "previewDisplay");
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