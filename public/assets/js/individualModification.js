document.addEventListener("DOMContentLoaded", function () {
    const productSelector = document.getElementById("productSelector");

    productSelector.addEventListener("change", function () {
    const productId = this.value;

    fetch(`/products/fetch-by-id?product_id=${productId}`)
        .then(response => {
        if (!response.ok) {
            throw new Error("제품 정보를 불러올 수 없습니다.");
        }
        return response.json();
        })
        .then(data => {
        // input, select, textarea 등 모든 필드에 값 주입
        for (const key in data) {
            const input = document.getElementById("edit_" + key);
            if (input) {
            // 이미지인 경우 preview 처리
            if (key === "image_url") {
                const preview = document.getElementById("edit_imagePreview");
                const container = document.getElementById("edit_imagePreviewContainer");
                const text = document.getElementById("edit_uploadText");

                preview.src = data[key];
                preview.style.display = "block";
                container.style.display = "inline-block";
                text.style.display = "none";
            } else {
                input.value = data[key];
            }
            }
        }

        // 숨겨진 id 필드도 같이 세팅
        const hiddenId = document.getElementById("edit_product_id");
        if (hiddenId) hiddenId.value = data.id;
        })
        .catch(error => {
        alert(error.message);
        });
    });

    // 제품 수정
    document.getElementById("editProductForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const form = e.target;
        const productId = document.getElementById("edit_product_id").value;

        const jsonData = {
        classification: document.getElementById("productSelector").selectedOptions[0].text,
        size: form.edit_size.value,
        weight: form.edit_weight.value,
        voltage: form.edit_voltage.value,
        hot_water_capacity: form.edit_hot_water_capacity.value,
        wireless_remote: form.edit_wireless_remote.value,
        nozzle_3ways: form.edit_nozzle_3ways.value,
        nozzle_sterilization: form.edit_nozzle_sterilization.value,
        bidet_move: form.edit_bidet_move.value,
        cleaning_move: form.edit_cleaning_move.value,
        turbo_wash: form.edit_turbo_wash.value,
        massage_mode: form.edit_massage_mode.value,
        child_mode: form.edit_child_mode.value,
        adjust_position: form.edit_adjust_position.value,
        adjust_pressure: form.edit_adjust_pressure.value,
        adjust_temperature: form.edit_adjust_temperature.value,
        soft_open_close: form.edit_soft_open_close.value,
        warm_dry: form.edit_warm_dry.value,
        toilet_compatibility: form.edit_toilet_compatibility.value,
        warm_seat: form.edit_warm_seat.value,
        controller_type: form.edit_controller_type.value,
        led_light: form.edit_led_light.value,
        self_cleaning_nozzle: form.edit_self_cleaning_nozzle.value,
        nozzle_material: form.edit_nozzle_material.value,
        tank_type: form.edit_tank_type.value,
        controller_waterproof: form.edit_controller_waterproof.value,
        main_body_waterproof: form.edit_main_body_waterproof.value,
        remote_waterproof: form.edit_remote_waterproof.value,
        seat_sensor: form.edit_seat_sensor.value,
        power_saving: form.edit_power_saving.value,
        price: form.edit_price.value
        };

        fetch(`/products/update/bidet/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
        })
        .then(res => {
            if (res.ok) {
            location.reload();
            } else {
            alert("수정 실패. 다시 시도해주세요.");
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("서버 오류가 발생했습니다.");
        });
    });
});