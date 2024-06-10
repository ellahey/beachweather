async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
        {
            "Content-Type": "application/json",
            headers: { Authorization: "Bearer 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"},
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    return await response.json();
}

