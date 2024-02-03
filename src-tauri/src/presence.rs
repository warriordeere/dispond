use discord_rpc_client::Client;
use dotenv::dotenv;
use std::env;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

pub fn setup_presence() -> Result<(), discord_rpc_client::Error> {
    println!("running rpc");
    dotenv().ok();
    let client_id = env::var("RPC_CLIENT_ID").unwrap();
    let mut client = Client::new(client_id.parse::<u64>().unwrap());
    client.start();

    let start_time = SystemTime::now();
    let since_epoch = start_time
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let timestamp = since_epoch.as_secs();

    client.set_activity(|act| {
        act.state("In the app")
            .details("Using my Tauri app")
            .assets(|ass| {
                ass.large_image("arcavigi_interactive_logo")
                    .large_text("My Tauri App")
            })
            .timestamps(|t| t.start(timestamp))
    })?;

    std::thread::sleep(Duration::from_secs(15));
    Ok(())
}
