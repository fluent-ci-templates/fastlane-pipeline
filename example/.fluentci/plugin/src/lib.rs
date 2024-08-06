use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_devbox;

pub mod helpers;

#[plugin_fn]
pub fn exec_lane(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- bundle install"])?
        .with_exec(vec!["devbox run -- bundle exec fastlane", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn android(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- bundle install"])?
        .with_exec(vec!["devbox run -- bundle exec fastlane android", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn ios(args: String) -> FnResult<String> {
    setup_devbox()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox run -- bundle install"])?
        .with_exec(vec!["devbox run -- bundle exec fastlane ios", &args])?
        .stdout()?;
    Ok(stdout)
}
