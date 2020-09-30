package com.gln;

import com.gln.resource.UserAccountResourceTest;
import io.quarkus.test.junit.NativeImageTest;

@NativeImageTest
public class NativeExampleResourceIT extends UserAccountResourceTest {

    // Execute the same tests but in native mode.
}